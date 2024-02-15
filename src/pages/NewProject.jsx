import { Form } from "../components/Form"


export const NewProject = () => {
  return (
    <>
      <h1 className="text-4xl font-black"> Create new project</h1>

      <div className="mt-10 flex justify-center">
        <Form />
      </div>
    </>
  )
}
