module triturus::donate {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::event;
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::balance::{Self, Balance};
    use sui::name_service::{Self, NameService};

    // ===== Constants =====
    const EInvalidAmount: u64 = 0;
    const EInvalidDuration: u64 = 1;
    const EDuplicateSubscription: u64 = 2;

    // ===== Structs =====
    struct DonationCap has key {
        id: UID,
        balance: Balance<SUI>
    }

    struct Subscription has key, store {
        id: UID,
        amount: u64,
        duration: u64,
        start_time: u64,
        owner: address
    }

    // ===== Events =====
    struct DonationEvent has copy, drop {
        amount: u64,
        sender: address,
        message: vector<u8>
    }

    struct SubscriptionEvent has copy, drop {
        amount: u64,
        duration: u64,
        owner: address
    }

    // ===== Functions =====
    fun init(ctx: &mut TxContext) {
        let donation_cap = DonationCap {
            id: object::new(ctx),
            balance: balance::zero()
        };
        transfer::share_object(donation_cap);
    }

    public entry fun buy_triturus(
        donation_cap: &mut DonationCap,
        payment: &mut Coin<SUI>,
        amount: u64,
        message: vector<u8>,
        ctx: &mut TxContext
    ) {
        assert!(amount > 0, EInvalidAmount);
        
        let sui_balance = coin::into_balance(coin::from_coin(payment, ctx));
        balance::join(&mut donation_cap.balance, sui_balance);
        
        event::emit(DonationEvent {
            amount,
            sender: tx_context::sender(ctx),
            message
        });
    }

    public entry fun create_subscription(
        donation_cap: &mut DonationCap,
        payment: &mut Coin<SUI>,
        amount: u64,
        duration: u64,
        ctx: &mut TxContext
    ) {
        assert!(amount > 0, EInvalidAmount);
        assert!(duration > 0, EInvalidDuration);
        
        let sender = tx_context::sender(ctx);
        let sui_balance = coin::into_balance(coin::from_coin(payment, ctx));
        balance::join(&mut donation_cap.balance, sui_balance);
        
        let subscription = Subscription {
            id: object::new(ctx),
            amount,
            duration,
            start_time: tx_context::epoch(ctx),
            owner: sender
        };
        
        transfer::transfer(subscription, sender);
        
        event::emit(SubscriptionEvent {
            amount,
            duration,
            owner: sender
        });
    }

    // ===== View Functions =====
    public fun get_donation_balance(donation_cap: &DonationCap): u64 {
        balance::value(&donation_cap.balance)
    }
} 