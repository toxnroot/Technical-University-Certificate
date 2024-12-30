import { GraduationCap, Phone, Calendar, Award ,User, Dna} from 'lucide-react';
import ButtonView from '../ButtonView/ButtonView';


export default function StudentCard({ student }) {

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full" dir="rtl">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
          <GraduationCap size={40} className="text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
        <p className="text-gray-600">Id :{student.id}</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <Award className="text-blue-600" />
            <span className="text-gray-600">Course :</span>
          </div>
          <span className="font-semibold text-gray-900">{student.course}</span>
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <User className="text-blue-600" />
            <span className="text-gray-600">instructor :</span>
          </div>
          <span className="font-semibold text-gray-900">{student.instructor}</span>
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <Calendar className="text-blue-600" />
            <span className="text-gray-600">Birthdate :</span>
          </div>
          <span className="font-semibold text-gray-900">{student.birthdate}</span>
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <Dna className="text-blue-600" />
            <span className="text-gray-600">Gender :</span>
          </div>
          <span className="font-semibold text-gray-900">{student.gender}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="text-blue-600" />
            <span className="text-gray-600">Phone :</span>
          </div>
          <span className="font-semibold text-gray-900">{student.number}</span>
        </div>
        <ButtonView click={() => window.location.href = `/certificate/${student.id}`} text="Get Certificate"/>
      </div>
    </div>
  );
}
