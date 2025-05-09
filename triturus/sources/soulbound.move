module triturus::soulbound {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::event;
    use sui::url::{Self, Url};

    // ===== Constants =====
    const EInvalidTier: u64 = 0;

    // ===== Structs =====
    struct SoulboundNFT has store {
        id: UID,
        tier: u8,
        owner: address,
        image_url: Url,
        minted_at: u64
    }

    struct SoulboundCap has key {
        id: UID
    }

    // ===== Events =====
    struct SoulboundMintedEvent has copy, drop {
        tier: u8,
        owner: address,
        minted_at: u64
    }

    // ===== Functions =====
    fun init(ctx: &mut TxContext) {
        let cap = SoulboundCap {
            id: object::new(ctx)
        };
        transfer::share_object(cap);
    }

    public entry fun mint_soulbound(
        cap: &mut SoulboundCap,
        tier: u8,
        image_url: vector<u8>,
        ctx: &mut TxContext
    ) {
        assert!(tier > 0 && tier <= 3, EInvalidTier);
        
        let sender = tx_context::sender(ctx);
        let url = url::new_unsafe_from_bytes(image_url);
        
        let soulbound = SoulboundNFT {
            id: object::new(ctx),
            tier,
            owner: sender,
            image_url: url,
            minted_at: tx_context::epoch(ctx)
        };
        
        transfer::transfer(soulbound, sender);
        
        event::emit(SoulboundMintedEvent {
            tier,
            owner: sender,
            minted_at: tx_context::epoch(ctx)
        });
    }

    // ===== View Functions =====
    public fun get_tier(soulbound: &SoulboundNFT): u8 {
        soulbound.tier
    }

    public fun get_owner(soulbound: &SoulboundNFT): address {
        soulbound.owner
    }
} 