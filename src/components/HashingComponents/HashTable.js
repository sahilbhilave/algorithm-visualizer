import Content from "./Content";
import Table from "./Table";
import Main from "./Main";
import ScaleLoader from 'react-spinners/ScaleLoader';
import React, { useState, useEffect } from 'react';

function HashTable() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }, []);
    return (
        <div className = "hash">

{loading ? 
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
            width: '100%',
            height: '100vh',
          }}
        >
          <ScaleLoader loading={loading} color={'white'} size={30} aria-label="Loading Spinner" data-testid="loader" />
        </div>
      : 
        <div>
        <Content/>
        <Table/>
        <Main/>
        </div>

      }
      </div>
    );
}


export default HashTable;