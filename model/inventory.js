// A custom object representing the inventory details class
class InventoryDetails {
  constructor(
    name,
    description,
    purchasedDate,
    purchasedFrom,
    purchasePrice,
    deviceSerialNumber,
    purchaseType,
    conditionScore,
    type,
    assigned,
    comments,
    issues
  ) {
    this.Name = name;
    this.Description = description;
    this.PurchasedDate = purchasedDate;
    this.PurchasedFrom = purchasedFrom;
    this.PurchasePrice = purchasePrice;
    this.DeviceSerialNumber = deviceSerialNumber;
    this.PurchaseType = purchaseType;
    this.ConditionScore = conditionScore;
    this.Type = type;
    this.Assigned = assigned;
    this.Comments = comments;
    this.Issues = issues;
  }
}

module.exports = InventoryDetails;
