import React from 'react';
import { ListGroup } from 'react-bootstrap';

const PlayListList = props => {

    return (
        <div>
            <ListGroup>
                {props.collection.map( (d) => <ListGroup.Item>{d}</ListGroup.Item>)}
            </ListGroup>
        </div>
    );
}

export default PlayListList;