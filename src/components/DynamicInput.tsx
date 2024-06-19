import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface InputData {
    data: string;
}

type InputState = Array<InputData>;

function DynamicInput(
    state: InputState,
    setState: Dispatch<SetStateAction<InputState>>
) {
    const handleAddInput = () => {
        setState([...state, { data: "" }]);
    };

    const handleChange = (event: ChangeEvent, index: number) => {
        //@ts-expect-error idk why the value did not recognized by the element type
        const { value } = event.target;
        const onChangeValue = [...state];
        onChangeValue[index].data = value;
        setState(onChangeValue);
        console.log(state);
    };

    const handleDeleteInput = (index: number) => {
        const newArray = [...state];
        newArray.splice(index, 1);
        setState(newArray);
    };

    return (
        <>
            {state.map((item, index) => (
                <div className="d-flex" key={index}>
                    <textarea
                        onChange={(event) => handleChange(event, index)}
                        value={item.data}
                        className="summernote-simple mb-2 mt-2 col-8 col-sm-10"
                        name="data"
                        style={{ width: "100%" }}
                        required={true}
                    ></textarea>

                    {index === state.length - 1 && (
                        <button
                            className="float-right btn btn-outline-primary ml-2 form-control mb-2 mt-2 col-sm-1 col-2"
                            onClick={() => handleAddInput()}
                        >
                            +
                        </button>
                    )}
                    {state.length > 1 && (
                        <button
                            className="float-right btn btn-outline-danger ml-2 form-control mb-2 mt-2 col-sm-1 col-2"
                            onClick={() => handleDeleteInput(index)}
                        >
                            -
                        </button>
                    )}
                </div>
            ))}
        </>
    );
}

export default DynamicInput;
