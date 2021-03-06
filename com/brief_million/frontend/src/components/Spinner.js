import React from 'react';
 
const Spinner = (size) => {
    return (
        <div style={{
            display:'flex', flex:1, alignItems:'center', justifyContent:'center', marginTop:30
        }}>
           <i className="fas fa-spinner fa-spin" style={{fontSize:40}}></i>
        </div>
    );
}

export {Spinner};