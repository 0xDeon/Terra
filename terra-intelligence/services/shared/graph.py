"""Social graph utility stubs for Terra Intelligence services."""


class SocialGraphUtils:
    """Utilities for working with the Terra social graph."""

    @staticmethod
    def get_connections(user_id: str) -> list[str]:
        """Get a user's social graph connections.

        Args:
            user_id: The user's identifier.

        Returns:
            A list of connected user IDs.
        """
        raise NotImplementedError("SocialGraphUtils.get_connections is not yet implemented")

    @staticmethod
    def compute_affinity(user_a: str, user_b: str) -> float:
        """Compute the affinity score between two users.

        Args:
            user_a: First user's identifier.
            user_b: Second user's identifier.

        Returns:
            An affinity score between 0.0 and 1.0.
        """
        raise NotImplementedError("SocialGraphUtils.compute_affinity is not yet implemented")
