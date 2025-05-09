module triturus::donate {
    use sui::object::{UID};
    use sui::transfer;
    use sui::tx_context::{TxContext};
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::event;
    use sui::sui::SUI;

    /// Errors
    const EInvalidAmount: u64 = 1;
    const EDuplicateSubscription: u64 = 2;

    /// Events
    public struct DonationEvent has copy, drop {
        donor: address,
        amount: u64,
        timestamp: u64
    }

    public struct SubscriptionEvent has copy, drop {
        subscriber: address,
        amount: u64,
        timestamp: u64
    }

    /// Structs
    public struct DonationCap has key {
        id: UID,
        balance: Balance<SUI>,
        total_donations: u64,
        total_subscribers: u64
    }

    public struct Subscription has key, store {
        id: UID,
        subscriber: address,
        amount: u64,
        start_time: u64
    }

    /// Functions
    fun init(ctx: &mut TxContext) {
        let cap = DonationCap {
            id: object::new(ctx),
            balance: balance::zero(),
            total_donations: 0,
            total_subscribers: 0
        };
        transfer::share_object(cap);
    }

    public fun donate(
        cap: &mut DonationCap,
        payment: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        let amount = coin::value(&payment);
        assert!(amount > 0, EInvalidAmount);
        
        let sui_balance = coin::into_balance(payment);
        let sender = tx_context::sender(ctx);
        
        // Update total donations
        cap.total_donations = cap.total_donations + amount;
        
        // Emit donation event
        event::emit(DonationEvent {
            donor: sender,
            amount,
            timestamp: tx_context::epoch(ctx)
        });
        
        // Transfer SUI to the contract
        balance::join(&mut cap.balance, sui_balance);
    }

    public fun subscribe(
        cap: &mut DonationCap,
        payment: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        let amount = coin::value(&payment);
        assert!(amount > 0, EInvalidAmount);
        
        let sui_balance = coin::into_balance(payment);
        let sender = tx_context::sender(ctx);
        
        // Create subscription
        let subscription = Subscription {
            id: object::new(ctx),
            subscriber: sender,
            amount,
            start_time: tx_context::epoch(ctx)
        };
        
        // Update total subscribers
        cap.total_subscribers = cap.total_subscribers + 1;
        
        // Emit subscription event
        event::emit(SubscriptionEvent {
            subscriber: sender,
            amount,
            timestamp: tx_context::epoch(ctx)
        });
        
        // Transfer SUI to the contract
        balance::join(&mut cap.balance, sui_balance);
        
        // Transfer subscription to sender
        transfer::transfer(subscription, sender);
    }
} 