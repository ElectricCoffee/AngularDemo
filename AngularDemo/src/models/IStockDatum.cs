namespace AngularDemo.models;

public interface IStockDatum
{
    string ItemName { get; set; }
    int Amount { get; set; }
    Guid ItemId { get; set; }
    string Location { get; set; }
}