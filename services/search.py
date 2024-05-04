#!"C:/Users/José Luis Herrera/AppData/Local/Programs/Python/Python39/python"
import cgi, json
from utils import get_markets, get_settlement_points, get_settlements

# Block 2 : Get inputs from the client
form = cgi.FieldStorage()
name = form.getvalue("name")
dataformat = form.getvalue("format")
where = form.getvalue("where")
srid = form.getvalue("srid")

if where == "markets":
    result = get_markets(name, srid)
elif where == "settlements":
    result = get_settlement_points(name, srid)

if name is None:
    name = ""
if name == "" and dataformat == "geojson":
    result = get_settlements("")

# # Block 5: Get result of operation

# else:
#     settlements = get_settlement_points(name)
# Block 6: Return result to the client
print("Content-type: application/json")
print()
#print(json.dumps({"name": name,"d": dataformat,"w": where,"s": srid}))
# if result:
print(result)
# else: 
#     print({"error" : "Falle"})
#print(settlements)