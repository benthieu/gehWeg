import { FormControl, FormGroup } from "@mui/material";
import { Form } from "react-router-dom";

export function AddOfferForm() {
  return (
    <>
      <header>
        <h1>Add offer</h1>
      </header>
      <section>
        <FormGroup>
            <Form>
                <FormControl></FormControl>
            </Form>
        </FormGroup>
      </section>
      <footer></footer>
    </>
  );
}
