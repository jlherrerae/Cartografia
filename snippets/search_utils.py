def search_market(name, srid):
    selectQuery = "SELECT st_asgeojson(st_centroid(st_transform(geom, %d))) as geom FROM data.markets WHERE geom is not null AND name LIKE '%s'" % (int(srid), "%"+name+"%")
    cursor.execute(selectQuery)
    result = cursor.fetchall()
    if result[0]["geom"] is not None:
        return json.loads(result[0]["geom"])
        
def search_settlement(name, srid):
    selectQuery = "SELECT st_asgeojson(st_centroid(st_transform(geom, %d))) as geom FROM data.settlement WHERE geom is not null AND name LIKE '%s'" % (int(srid), "%"+name+"%")
    cursor.execute(selectQuery)
    result = cursor.fetchall()
    if result[0]["geom"] is not None:
        return json.loads(result[0]["geom"])