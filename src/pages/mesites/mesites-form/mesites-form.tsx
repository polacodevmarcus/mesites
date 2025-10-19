import { useForm } from "react-hook-form";
import { Button, Input } from "../../../components";
import { useMesitesStore } from "../../../store/store";

interface MesitesFormData {
  name: string;
  address: string;
  evangelizationDate: string;
  contact: string;
  evangelizerName: string;
}

export const MesitesForm = () => {
  const addMesite = useMesitesStore((state) => state.addMesite);
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<MesitesFormData>();

  const onSubmit = (data: MesitesFormData) => {
    console.log('Form data:', data);
    if (!isValid) {
      return;
    }
    addMesite({
      name: data.name,
      address: data.address,
      evangelizationDate: data.evangelizationDate,
      contact: data.contact,
      evangelizerName: data.evangelizerName
    });

    reset();
  };

  return (
    <>
      <h2 className="text-left text-2xl sm:text-3xl font-bold mb-6">Registrar Nueva Persona</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="name"
          label="Name"
          type="text"
          placeholder="Ingrese el nombre"
          register={register("name", {
            required: "El nombre es requerido",
            minLength: {
              value: 2,
              message: "El nombre debe tener al menos 2 caracteres"
            }
          })}
          error={errors.name?.message as string | undefined}
        />
        <Input
          id="address"
          label="Direccion"
          type="text"
          placeholder="Ingrese la direccion"
          register={register("address", {
            required: "La dirección es requerida",
            minLength: {
              value: 5,
              message: "La dirección debe tener al menos 5 caracteres"
            }
          })}
          error={errors.address?.message as string | undefined}
        />
        <Input
          id="evangelizationDate"
          label="Fecha de Evangelizacion"
          type="date"
          register={register("evangelizationDate", {
            required: "La fecha de evangelización es requerida"
          })}
          error={errors.evangelizationDate?.message as string | undefined}
        />
        <Input
          id="contactNumber"
          label="Contacto (telefono o celular)"
          type="phone"
          placeholder="Ingrese numero de contacto"
          register={register("contact", {
            required: "El contacto es requerido",
            pattern: {
              value: /^[\d\s\-+()]+$/,
              message: "Ingrese un número de teléfono válido"
            }
          })}
          error={errors.contact?.message as string | undefined}
        />
        <Input
          id="evangelizerName"
          label="Nombre del Evangelizador"
          type="text"
          placeholder="Ingrese el Nombre del Evangelizador"
          register={register("evangelizerName", {
            required: "El nombre del evangelizador es requerido",
            minLength: {
              value: 2,
              message: "El nombre debe tener al menos 2 caracteres"
            }
          })}
          error={errors.evangelizerName?.message as string | undefined}
        />
        {/* {console.log('isValid:', isValid)} */}
        <Button name='Guardar' icon="save" disabled={!isValid} />
      </form>
    </>

  )
}
