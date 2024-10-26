namespace AngularDemo.models;

public class StockDatum : IStockDatum
{
    public StockDatum(string name, string location, int amount = 1, string? itemId = null)
    {
        ItemName = name;
        Location = location;
        Amount = amount;
        ItemId = itemId ?? Guid.NewGuid().ToString()[..5];
    }
    public string ItemName { get; set; }
    public int Amount { get; set; }
    public string ItemId { get; set; }
    public string Location { get; set; }
}