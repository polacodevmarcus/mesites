import { Button } from '../../../components';
import { MesitesModal } from '../mesites-modal'

interface MesitesDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  nameToDelete: string;
}

export const MesitesDelete = ({ isOpen, onClose, onDelete, nameToDelete }: MesitesDeleteProps) => {
  return (
    <MesitesModal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Eliminación"
    >
      <div className="flex justify-center items-center mx-auto w-16 h-16 rounded-full bg-destructive/10 mb-4 bg-red-100">
        <span className="material-symbols-outlined text-4xl text-destructive text-red-500" data-icon="warning">
          warning
        </span>
      </div>
      <p>¿Está seguro de que desea eliminar a <span className='font-bold'>{nameToDelete}</span>? Esta accion es permanente y no se puede deshacer.</p>

      <div className="flex w-full gap-3 mt-6">
        <Button
          name="Cancelar"
          onClick={onClose}
          color="bg-slate-400"
        />
        <Button name='Eliminar' onClick={onDelete} color="bg-red-500" />
      </div>
    </MesitesModal>
  )
}
