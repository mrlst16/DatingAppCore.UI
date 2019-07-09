import React, { useState } from 'react'
import DatingApp from '../Utils';
import { Form, Button } from 'react-bootstrap'
import Utils from '../Utils';

const Filter = (props) => {
    const utils = new Utils();

    const [sex, setSex] = useState();
    const [gender, setGender] = useState();
    const [dogs, setDogs] = useState();

    return <div className="container">
        <h3>Filter</h3>
        <div className="row">
            <div className="col-4">
                Sex
            </div>
            <div className="col-8">
                M <input type="radio" value="m" checked={(sex && sex === "m") ? "checked" : ""} label="M" name="sex" value="m" onChange={() => setSex('m')} />
                F <input type="radio" value="f" checked={(sex && sex === "f") ? "checked" : ""} label="F" name="sex" value="f" onChange={() => setSex('f')} />
            </div>

        </div>

        <div className="row">
            <div className="col-4">
                Gender
            </div>
            <div className="col-8">
                M <input type="radio" value="m" checked={(gender && gender === "m") ? "checked" : ""} label="M" name="gender" onChange={() => setGender('m')} />
                F <input type="radio" value="f" checked={(gender && gender === "f") ? "checked" : ""} label="F" name="gender" onChange={() => setGender('f')} />
            </div>
        </div>

        <div className="row">
            <div className="col-4">
                Feelings about dogs
            </div>
            <div className="col-8">
                Love Them <input type="radio" value="t" checked={(dogs && dogs === "t") ? "checked" : ""} name="dogs" onChange={() => setDogs('t')} />
                Not A Fan <input type="radio" value="f" checked={(dogs && dogs === "f") ? "checked" : ""} name="dogs" onChange={() => setDogs('f')} />
                Neutral <input type="radio" value="n" checked={(dogs && dogs === "n") ? "checked" : ""} name="dogs" onChange={() => setDogs('n')} />
            </div>
        </div>
    </div >;
}

export default Filter;