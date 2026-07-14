from models.purchase import Purchase
from models.emission_factor import EmissionFactor
from models.carbon_transaction import CarbonTransaction


class CarbonEngine:

    def __init__(self, db):
        self.db = db

    def calculate_emission(self, purchase):

        factor = (
            self.db.query(EmissionFactor)
            .filter(
                EmissionFactor.material == purchase.material,
                EmissionFactor.transport_mode == purchase.transport_mode,
            )
            .first()
        )

        if factor is None:
            raise ValueError(
                "No emission factor found for this purchase."
            )

        emission_value = (
            purchase.quantity *
            factor.emission_factor
        )

        transaction = CarbonTransaction(
            purchase_id=purchase.id,
            scope=factor.scope,
            emission_value=emission_value,
            emission_unit="kg CO₂e",
            calculation_method="Emission Factor Method",
        )

        self.db.add(transaction)
        self.db.commit()
        self.db.refresh(transaction)

        return transaction