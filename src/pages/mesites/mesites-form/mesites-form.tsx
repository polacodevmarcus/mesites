import { useForm } from "react-hook-form";
import { Button, Input } from "../../../components";
import { useMesitesStore } from "../../../store/store";
import { MesitesModal } from "../mesites-modal";

import supabase from "../../../supabase-client"

interface MesitesFormData {
  name: string;
  address: string;
  evangelizationDate: string;
  contact: string;
  evangelizerName: string;
}

interface MesitesFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MesitesForm = ({ isOpen, onClose }: MesitesFormProps) => {
  const addMesite = useMesitesStore((state) => state.addMesite);
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<MesitesFormData>();

  const onSubmit = async (data: MesitesFormData) => {
    if (!isValid) {
      return;
    }

    const dataToInsert = {
      name: data.name,
      address: data.address,
      evangelization_date: data.evangelizationDate,
      contact: data.contact,
      evangelizer_name: data.evangelizerName
    };

    await supabase.from('mesites').insert(dataToInsert).single();

    addMesite({
      name: data.name,
      address: data.address,
      evangelizationDate: data.evangelizationDate,
      contact: data.contact,
      evangelizerName: data.evangelizerName
    });

    reset();
    onClose(); // Close modal after successful submission
  };

  return (
    <MesitesModal
      isOpen={isOpen}
      onClose={onClose}
      title="Registrar Nueva Persona"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="name"
          label="Nombre"
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
        <div className="flex w-full gap-3 mt-6">
          <Button
            name="Cancelar"
            onClick={onClose}
            color="bg-red-500"
          />
          <Button name='Guardar' icon="save" disabled={!isValid} />
        </div>
      </form>
    </MesitesModal>
  );
};