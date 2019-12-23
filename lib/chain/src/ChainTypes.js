let ChainTypes = {};

ChainTypes.reserved_spaces = {
    relative_protocol_ids: 0,
    protocol_ids: 1,
    implementation_ids: 2
};

ChainTypes.object_type = {
    null: 0,
    base: 1,
    account: 2,
    asset: 3,
    //force_settlement: 4,
    committee_member: 4,
    witness: 5,
    // limit_order: 7,
    // call_order: 8,
    custom: 6,
    proposal: 7,
    operation_history: 8,
    withdraw_permission: 9,
    vesting_balance: 10,
    worker: 11,
    balance: 12,
    htlc: 13
};

ChainTypes.impl_object_type = {
    global_property: 0,
    dynamic_global_property: 1,
    index_meta: 2,
    asset_dynamic_data: 3,
    //asset_bitasset_data: 4,
    account_balance: 4,
    account_statistics: 5,
    transaction: 6,
    block_summary: 7,
    account_transaction_history: 8,
    blinded_balance: 9,
    chain_property: 10,
    witness_schedule: 11,
    budget_record: 12
};

ChainTypes.vote_type = {
    committee: 0,
    witness: 1,
    worker: 2
};

ChainTypes.operations = {
    transfer: 0,
    // limit_order_create: 1,
    // limit_order_cancel: 2,
    // call_order_update: 3,
    // fill_order: 4,
    account_create: 1,
    account_update: 2,
    account_whitelist: 3,
    account_upgrade: 4,
    account_transfer: 5,
    // asset_create: 10,
    asset_update: 6,
    // asset_update_bitasset: 12,
    // asset_update_feed_producers: 13,
    // asset_issue: 14,
    asset_reserve: 7,
    // asset_fund_fee_pool: 16,
    // asset_settle: 17,
    // asset_global_settle: 18,
    // asset_publish_feed: 19,
    witness_create: 8,
    witness_update: 9,
    proposal_create: 19,
    proposal_update: 11,
    proposal_delete: 12,
    withdraw_permission_create: 13,
    withdraw_permission_update: 14,
    withdraw_permission_claim: 15,
    withdraw_permission_delete: 16,
    committee_member_create: 17,
    committee_member_update: 18,
    committee_member_update_global_parameters: 19,
    vesting_balance_create: 20,
    vesting_balance_withdraw: 21,
    worker_create: 22,
    custom: 23,
    assert: 24,
    balance_claim: 25,
    override_transfer: 26,
    transfer_to_blind: 27,
    blind_transfer: 28,
    transfer_from_blind: 29,
    // asset_settle_cancel: 42,
    // asset_claim_fees: 43,
    // fba_distribute: 44,
    // bid_collateral: 45,
    // execute_bid: 46,
    // asset_claim_pool: 47,
    // asset_update_issuer: 48,
    htlc_create: 30,
    htlc_redeem: 31,
    htlc_redeemed: 32,
    htlc_extend: 33,
    htlc_refund: 34,
    sale: 35,
};

export default ChainTypes;
