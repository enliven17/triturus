module triturus::wallet_names {
    use sui::object::{UID};
    use sui::transfer;
    use sui::tx_context::{TxContext};
    use sui::event;
    use sui::table::{Self, Table};
    use sui::string::{Self, String};

    /// Errors
    const ENameAlreadyExists: u64 = 1;
    const ENameTooShort: u64 = 2;
    const ENameTooLong: u64 = 3;
    const EInvalidCharacters: u64 = 4;
    const ENameNotFound: u64 = 5;
    const ENotAuthorized: u64 = 6;
    const EInvalidNameFormat: u64 = 7;

    /// Events
    public struct WalletNameRegisteredEvent has copy, drop {
        owner: address,
        name: String,
        timestamp: u64
    }

    public struct WalletNameUpdatedEvent has copy, drop {
        owner: address,
        old_name: String,
        new_name: String,
        timestamp: u64
    }

    /// Structs
    public struct WalletNameRegistry has key {
        id: UID,
        names: Table<String, address>,
        owner_names: Table<address, String>
    }

    /// Functions
    fun init(ctx: &mut TxContext) {
        let registry = WalletNameRegistry {
            id: object::new(ctx),
            names: table::new(ctx),
            owner_names: table::new(ctx)
        };
        transfer::share_object(registry);
    }

    public fun register_name(
        registry: &mut WalletNameRegistry,
        name: vector<u8>,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let name_str = string::utf8(name);
        
        // Validate name format (@tri extension)
        assert!(string::starts_with(&name_str, string::utf8(b"@tri")), EInvalidNameFormat);
        let name_without_prefix = string::sub_string(&name_str, 4, string::length(&name_str) - 4);
        
        // Validate name length (excluding @tri prefix)
        assert!(string::length(&name_without_prefix) >= 3, ENameTooShort);
        assert!(string::length(&name_without_prefix) <= 20, ENameTooLong);
        
        // Check if name already exists
        assert!(!table::contains(&registry.names, name_str), ENameAlreadyExists);
        
        // Check if user already has a name
        if (table::contains(&registry.owner_names, sender)) {
            let old_name = table::borrow(&registry.owner_names, sender);
            table::remove(&mut registry.names, *old_name);
        };
        
        // Register new name
        table::add(&mut registry.names, name_str, sender);
        table::add(&mut registry.owner_names, sender, name_str);
        
        // Emit event
        event::emit(WalletNameRegisteredEvent {
            owner: sender,
            name: name_str,
            timestamp: tx_context::epoch(ctx)
        });
    }

    public fun update_name(
        registry: &mut WalletNameRegistry,
        new_name: vector<u8>,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let new_name_str = string::utf8(new_name);
        
        // Validate name format (@tri extension)
        assert!(string::starts_with(&new_name_str, string::utf8(b"@tri")), EInvalidNameFormat);
        let name_without_prefix = string::sub_string(&new_name_str, 4, string::length(&new_name_str) - 4);
        
        // Validate name length (excluding @tri prefix)
        assert!(string::length(&name_without_prefix) >= 3, ENameTooShort);
        assert!(string::length(&name_without_prefix) <= 20, ENameTooLong);
        
        // Check if new name already exists
        assert!(!table::contains(&registry.names, new_name_str), ENameAlreadyExists);
        
        // Check if user has a name
        assert!(table::contains(&registry.owner_names, sender), ENameNotFound);
        
        // Get old name
        let old_name = table::borrow(&registry.owner_names, sender);
        
        // Remove old name
        table::remove(&mut registry.names, *old_name);
        
        // Add new name
        table::add(&mut registry.names, new_name_str, sender);
        table::add(&mut registry.owner_names, sender, new_name_str);
        
        // Emit event
        event::emit(WalletNameUpdatedEvent {
            owner: sender,
            old_name: *old_name,
            new_name: new_name_str,
            timestamp: tx_context::epoch(ctx)
        });
    }

    // ===== View Functions =====
    public fun get_address_by_name(registry: &WalletNameRegistry, name: vector<u8>): address {
        let name_str = string::utf8(name);
        assert!(table::contains(&registry.names, name_str), ENameNotFound);
        *table::borrow(&registry.names, name_str)
    }

    public fun get_name_by_address(registry: &WalletNameRegistry, addr: address): String {
        assert!(table::contains(&registry.owner_names, addr), ENameNotFound);
        *table::borrow(&registry.owner_names, addr)
    }

    public fun has_name(registry: &WalletNameRegistry, addr: address): bool {
        table::contains(&registry.owner_names, addr)
    }
} 