import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listActions } from "../../_actions";
import Map from "../../_components/map/map";
import Pagination from "../../_components/pagination/pagination";

function ListPage() {
  const list = useSelector((state) => state.list);
  const [currentItems, setCurrentItems] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listActions.getAll());
    //positions
    //setSelectedPositions(positions)
  }, []);

  function handleDeleteItem(id) {
    dispatch(listActions.delete(id));
  }

  function onChangePage(pager) {
    console.log("pager", pager);
    setCurrentItems(pager.items);
  }

  function onRowSelected(item) {
    const mapPositions = [
      {
        key: item.id,
        lat: item.positions[0].lat,
        lng: item.positions[0].lng,
        title: `userId ${item.userId}`,
        description: item.title,
      }, {
        key: item.id+1,
        lat: item.positions[1].lat,
        lng: item.positions[1].lng,
        title: `userId ${item.userId}`,
        description: item.title,
      }
    ];
    setSelectedPositions(mapPositions);
  }

  const positions = [
    {
      lat: 43.656132,
      lng: -79.380423,
      title: "test title",
      description: "test description",
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-6">
          <div className="row">
            <div className="col-lg-8">
              {list.loading && <em>Loading items...</em>}
              {list.error && (
                <span className="text-danger">ERROR: {list.error}</span>
              )}
              {currentItems && (
                <table style={{border: '1px solid ',borderColor:"red" ,width:"350px"  }}>
                  <thead>
                    <tr style={{borderBottom: '1px solid',borderColor:"red"}}>
                      <th>#</th>
                      <th>Item</th>
                    </tr>
                  </thead>
                  {currentItems.map((item, index) => (
                    <tbody key={item.id}><tr

                      onClick={() => {
                        onRowSelected(item);
                      }}
                      style={{borderBottom: '1px solid',borderColor:"red"}}
                    >
                      <td>*</td>
                      <td>{item.title}</td>
                    </tr></tbody>
                  ))}

                </table>
              )}
            </div>
            <Pagination items={list.items} onChangePage={onChangePage} />
          </div>
        </div>
        <div className="col-4 google-map">
          {selectedPositions && <Map positions={selectedPositions} />}
        </div>
      </div>
    </>
  );
}

export { ListPage };
