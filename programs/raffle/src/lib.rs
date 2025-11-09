use anchor_lang::prelude::*;

// Program ID declared in Anchor.toml
declare_id!("BYhrkv1yPFJrtyKbL5UBF2GvabQw3His9tF5AV2JgzRy");

#[program]
pub mod raffle {
    use super::*;

    /// Initialize a new raffle
    pub fn initialize_raffle(
        ctx: Context<InitializeRaffle>,
        entry_price: u64,
        max_entries: u64,
        end_timestamp: i64,
    ) -> Result<()> {
        // TODO: Implement raffle initialization
        msg!("Raffle initialized with entry price: {}", entry_price);
        Ok(())
    }

    /// Enter a raffle by paying DRAGON tokens
    pub fn enter_raffle(
        ctx: Context<EnterRaffle>,
        num_entries: u64,
    ) -> Result<()> {
        // TODO: Implement raffle entry logic
        msg!("User entering raffle with {} entries", num_entries);
        Ok(())
    }

    /// Select winner and distribute prize
    pub fn draw_winner(ctx: Context<DrawWinner>) -> Result<()> {
        // TODO: Implement winner selection using blockhash randomness
        msg!("Drawing winner for raffle");
        Ok(())
    }

    /// Claim prize (NFT) as the winner
    pub fn claim_prize(ctx: Context<ClaimPrize>) -> Result<()> {
        // TODO: Implement prize claiming
        msg!("Winner claiming prize");
        Ok(())
    }
}

// Account structures
#[derive(Accounts)]
pub struct InitializeRaffle<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    
    #[account(
        init,
        payer = authority,
        space = 8 + RaffleAccount::INIT_SPACE
    )]
    pub raffle: Account<'info, RaffleAccount>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct EnterRaffle<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    
    #[account(mut)]
    pub raffle: Account<'info, RaffleAccount>,
}

#[derive(Accounts)]
pub struct DrawWinner<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    
    #[account(mut)]
    pub raffle: Account<'info, RaffleAccount>,
}

#[derive(Accounts)]
pub struct ClaimPrize<'info> {
    #[account(mut)]
    pub winner: Signer<'info>,
    
    #[account(mut)]
    pub raffle: Account<'info, RaffleAccount>,
}

// Data structures
#[account]
pub struct RaffleAccount {
    pub authority: Pubkey,        // 32 bytes
    pub nft_mint: Pubkey,          // 32 bytes
    pub entry_price: u64,          // 8 bytes
    pub max_entries: u64,          // 8 bytes
    pub current_entries: u64,      // 8 bytes
    pub end_timestamp: i64,        // 8 bytes
    pub winner: Option<Pubkey>,    // 1 + 32 bytes
    pub status: RaffleStatus,      // 1 byte
    pub bump: u8,                  // 1 byte
}

impl RaffleAccount {
    pub const INIT_SPACE: usize = 32 + 32 + 8 + 8 + 8 + 8 + 33 + 1 + 1;
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum RaffleStatus {
    Active,
    Ended,
    Claimed,
}

// Errors
#[error_code]
pub enum RaffleError {
    #[msg("Raffle has not ended yet")]
    RaffleNotEnded,
    
    #[msg("Raffle has already ended")]
    RaffleEnded,
    
    #[msg("Maximum entries reached")]
    MaxEntriesReached,
    
    #[msg("Invalid entry amount")]
    InvalidEntryAmount,
    
    #[msg("Not the winner")]
    NotWinner,
    
    #[msg("Prize already claimed")]
    PrizeAlreadyClaimed,
}
