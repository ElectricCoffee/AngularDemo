namespace AngularDemo.models;

public class StockDatum : IStockDatum
{
    public string ItemName { get; set; }
    public int Amount { get; set; }
    public Guid ItemId { get; set; }
    public string Location { get; set; }
}