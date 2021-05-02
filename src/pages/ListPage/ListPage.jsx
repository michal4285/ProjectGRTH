import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listActions } from "../../_actions";
import Map from "../../_components/map/map";
import Pagination from "../../_components/pagination/pagination";

function ListPage() {
  const list = useSelector((state) => state.list);
  const [currentItems, setCurrentItems] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listActions.getAll());
  }, []);

  function handleDeleteItem(id) {
    dispatch(listActions.delete(id));
  }

  function onChangePage(pager) {
    console.log("pager", pager);
    setCurrentItems(pager.items);
  }

  const positions = [{
    lat: 43.656132,
    lng: -79.380423,
    title: "test title",
    description: "test description"
  }]

  return (
    <>
      <div className="row">
        <div className="col-9">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              {list.loading && <em>Loading items...</em>}
              {list.error && (
                <span className="text-danger">ERROR: {list.error}</span>
              )}
              {currentItems && (
                <ul>
                  {currentItems.map((item, index) => (
                    <li key={item.id}>{item.title}</li>
                  ))}
                </ul>
              )}
            </div>
            <Pagination items={list.items} onChangePage={onChangePage} />
          </div>
        </div>
        <div className="col-3">
          <Map
            positions={positions}
          />
        </div>
      </div>
    </>
  );
}

export { ListPage };
