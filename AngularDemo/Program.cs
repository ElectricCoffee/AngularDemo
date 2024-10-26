using AngularDemo.models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigin");

// this is our proxy for a database.
// Naturally it won't persist between runs, but I feel like setting up an entire database server is a bit beyond the scope of this project.
var demoData = new List<StockDatum>
{
    new("Plumbus","Aalborg"),
    new("Baterang","Svenstrup"),
    new("Uranium", "Odense")
};

app.MapGet("/stockdata", () => demoData).WithName("GetStockData").WithOpenApi();

// add a new item to the list. If the ID already exists, replace it instead.
app.MapPost("/stockdata", (StockDatum datum) =>
{
    var i = demoData.FindIndex(x => x.ItemId == datum.ItemId);
    
    if (i != -1)
    {
        demoData[i] = datum;
    }
    else
    {
        demoData.Add(datum);
    }
    return Results.Ok(datum);
}).WithName("PostStockData").WithOpenApi();

app.MapPut("/stockdata/{id}", (string id, StockDatum datum) =>
{
    var i = demoData.FindIndex(x => x.ItemId.Equals(id));

    if (i == -1)
    {
        return Results.NotFound();
    }
    
    demoData[i] = datum;
    return Results.Ok(datum);
}).WithName("PutStockData").WithOpenApi();

app.MapDelete("/stockdata/{id}", (string id) =>
{
    var i = demoData.FindIndex(x => x.ItemId.Equals(id));

    if (i == -1)
    {
        return Results.NotFound();
    }
    var datum = demoData[i];
    demoData.RemoveAt(i);
    
    return Results.Ok(datum); // return the item that was just deleted, just in case.
}).WithName("DeleteStockData").WithOpenApi();

app.Run();