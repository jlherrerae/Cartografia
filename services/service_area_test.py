#!"C:/Users/José Luis Herrera/AppData/Local/Programs/Python/Python39/python"

# Block 1: Import packages
import os
import json
import psycopg2
from psycopg2.extras import RealDictCursor
import cgi

# Block 2 : Get inputs from the client
form = cgi.FieldStorage() 
coord = form.getvalue("coord") 
# coord = coord.split(",") only for test
srid = form.getvalue("srid")

# Block 3: connect to the database
file = open(os.path.dirname(os.path.abspath(__file__)) +
"\db.credentials")
connection_string = file.readline() + file.readline()
pg_conn = psycopg2.connect(connection_string)
pg_cursor = pg_conn.cursor(cursor_factory=RealDictCursor)

# Block 4: Define functions
def get_markets(coord, srid):
    """
    """
    selectQuery = """
    SELECT a.gid, b.pop_2020::integer, a.name, b.categorie,
ARRAY[st_x(b.geom), st_y(b.geom)] as coord
        FROM data.smallmarketsinfluence as a
        JOIN data.bi_markets as b
        ON st_intersects(a.geom, b.geom) AND b.categorie ='small_markets'
        WHERE st_intersects(a.geom,ST_Transform(ST_GeomFromText('POINT(%s %s)', %d), st_srid(a.geom)))
    UNION
    SELECT a.gid, b.pop_2020::integer, a.name, b.categorie,
ARRAY[st_x(b.geom), st_y(b.geom)] as coord
        FROM data.mediummarketsinfluence as a
        JOIN data.bi_markets as b
        ON st_intersects(a.geom, b.geom) AND b.categorie ='medium_markets'
        WHERE st_intersects(a.geom,ST_Transform(ST_GeomFromText('POINT(%s %s)', %d), st_srid(a.geom)))
    UNION
    SELECT a.gid, b.pop_2020::integer, a.name, b.categorie,
ARRAY[st_x(b.geom), st_y(b.geom)] as coord
        FROM data.localmarketsinfluence as a
        JOIN data.bi_markets as b
        ON st_intersects(a.geom, b.geom) AND b.categorie ='local_markets'
        WHERE st_intersects(a.geom,ST_Transform(ST_GeomFromText('POINT(%s %s)', %d), st_srid(a.geom)))
    UNION
    SELECT a.gid, b.pop_2020::integer, a.name, b.categorie,
ARRAY[st_x(b.geom), st_y(b.geom)] as coord
        FROM data.capitalmarketsinfluence as a
        JOIN data.bi_markets as b
        ON st_intersects(a.geom, b.geom) AND b.categorie ='capital_markets'
        WHERE st_intersects(a.geom,ST_Transform(ST_GeomFromText('POINT(%s %s)', %d), st_srid(a.geom)))

    """     % (float(coord[0]), float(coord[1]), srid,
              float(coord[0]), float(coord[1]), srid,
              float(coord[0]), float(coord[1]), srid, 
              float(coord[0]), float(coord[1]), srid)
    pg_cursor.execute(selectQuery) 
    records = pg_cursor.fetchall() 
    return json.dumps(records)

# Block 5: Get result of operation
#The netx two lines is only for test
coord = [30.1350573460069, -2.49232712922942] 
srid = "4326"
markets = get_markets(coord, int(srid))
pg_conn.close()

# Block 6: Return result to the client
print("Content-type: application/json")
print()
print(markets)