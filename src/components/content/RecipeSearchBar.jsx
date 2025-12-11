// import bootstrap components
import React from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';

export const RecipeSearchBar = (props) => {
    return (
        <div>
            <Form inline>
                <FormControl type="text" placeholder="Search for recipes..." className="mr-sm-2" />
                <Button variant="outline-success" onClick={props.onSearch}>Search</Button>
            </Form>
        </div>
    );
};