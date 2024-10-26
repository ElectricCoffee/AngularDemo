using System.Text.Json.Serialization;

namespace AngularDemo.models;

public class StockDatum : IStockDatum
{
    [JsonConstructor]
    public StockDatum(string itemName, string location, int amount = 1, string? itemId = null)
    {
        ItemName = itemName;
        Location = location;
        Amount = amount;
        ItemId = itemId ?? Guid.NewGuid().ToString()[..5];
    }
    
    [JsonInclude]
    public string ItemName { get; set; }
    
    [JsonInclude]
    public int Amount { get; set; }
    
    [JsonInclude]
    public string ItemId { get; set; }
    
    [JsonInclude]
    public string Location { get; set; }
}