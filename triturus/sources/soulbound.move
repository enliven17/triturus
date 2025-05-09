module triturus::soulbound {
    use sui::object::{UID};
    use sui::transfer;
    use sui::tx_context::{TxContext};
    use sui::url::{Self, Url};
    use sui::event;

    /// Errors
    const EInvalidTier: u64 = 1;

    /// Events
    public struct SoulboundMintedEvent has copy, drop {
        owner: address,
        tier: u8,
        timestamp: u64
    }

    /// Structs
    public struct SoulboundNFT has key, store {
        id: UID,
        tier: u8,
        owner: address,
        image_url: Url,
        minted_at: u64
    }

    public struct SoulboundCap has key {
        id: UID,
        total_minted: u64
    }

    /// Functions
    fun init(ctx: &mut TxContext) {
        let cap = SoulboundCap {
            id: object::new(ctx),
            total_minted: 0
        };
        transfer::share_object(cap);
    }

    public fun mint(
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

        cap.total_minted = cap.total_minted + 1;

        event::emit(SoulboundMintedEvent {
            owner: sender,
            tier,
            timestamp: tx_context::epoch(ctx)
        });

        transfer::transfer(soulbound, sender);
    }

    // ===== View Functions =====
    public fun get_tier(soulbound: &SoulboundNFT): u8 {
        soulbound.tier
    }

    public fun get_owner(soulbound: &SoulboundNFT): address {
        soulbound.owner
    }
} 