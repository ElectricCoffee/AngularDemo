namespace AngularDemo.models;

public interface IStockDatum
{
    string ItemName { get; set; }
    int Amount { get; set; }
    // note to reviewer: we're using a string for the ID here because product IDs may very well be short
    // alphanumeric ids easily enterable by humans as opposed to the long and involved GUIDs
    string ItemId { get; set; }
    string Location { get; set; }
}