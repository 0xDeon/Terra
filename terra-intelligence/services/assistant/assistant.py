"""AI Wallet Assistant service for Terra."""


class WalletAssistant:
    """AI assistant that helps users understand their wallet activity and discover creators."""

    def explain_transaction(self, tx_data: dict) -> str:
        """Explain a blockchain transaction in plain language.

        Args:
            tx_data: Raw transaction data from the Stacks blockchain.

        Returns:
            A human-readable explanation string.
        """
        raise NotImplementedError("WalletAssistant.explain_transaction is not yet implemented")

    def recommend_creators(self, user_profile: dict) -> list[dict]:
        """Recommend creators based on a user's profile and activity.

        Args:
            user_profile: The user's profile and on-chain activity data.

        Returns:
            A list of recommended creator profiles.
        """
        raise NotImplementedError("WalletAssistant.recommend_creators is not yet implemented")
