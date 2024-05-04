# Block 1: Import packages
import os
import json
import psycopg2
from psycopg2.extras import RealDictCursor

# Block 2: connect to the database
file = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "db.credentials"))
connection_string = file.readline() + file.readline()
pg_conn = psycopg2.connect(connection_string)
pg_cursor = pg_conn.cursor(cursor_factory=RealDictCursor)

# Block 3: Define functions
def get_settlements(name):
    """ Search settlements """
    selectQuery = "SELECT gid, name, pop_2020, id_com, name_com FROM data.bi_settlements WHERE name LIKE '%{name}%';".format(name=name)
    pg_cursor.execute(selectQuery)
    result = pg_cursor.fetchall()
    return json.dumps(result[0])

def get_markets(name, srid):
    """ Search settlements """
    selectQuery = f"SELECT st_asgeojson(st_centroid(st_transform(geom,{srid}))) AS geom FROM data.bi_markets WHERE geom is not null AND name LIKE '%{name}%'"
    pg_cursor.execute(selectQuery)
    result = pg_cursor.fetchall()
    return result[0]["geom"] if result[0]["geom"] is not None else ''

def get_settlement_points(name, srid):
    """ search settlement by name :params: name -> Name of the settlement """
    selectQuery = f"SELECT st_asgeojson(st_centroid(st_transform(geom,{srid}))) AS geom FROM data.bi_settlements WHERE geom is not null AND name LIKE '%{name}%'"
    pg_cursor.execute(selectQuery)
    result = pg_cursor.fetchall()
    return result[0]["geom"] if result[0]["geom"] is not None else ''