#!/usr/bin/python3
"""
Obtains the profile
"""
import cgi, json
from utils import search_market, search_settlement

form = cgi.FieldStorage()
name = form.getvalue('name')
where = form.getvalue('where')
srid = form.getvalue('srid')
if where == 'market':
    result = search_market(name, srid)
else where == 'settlement':
    result = search_settlement(name, srid)


print("Content-type: application/json")
print()
print(json.dumps({"result": result}))