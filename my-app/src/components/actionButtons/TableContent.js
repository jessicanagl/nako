import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';

export const parseXML = (xmlData) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, 'application/xml');
  const participants = xmlDoc.getElementsByTagName('participant');

const parsedData = Array.from(participants).map((participant) => ({
  familyName: participant.getElementsByTagName('name')[0].textContent,
  firstName: participant.getElementsByTagName('firstname')[0].textContent,
  birthDay: participant.getElementsByTagName('day')[0].textContent,
  birthMonth: participant.getElementsByTagName('month')[0].textContent,
  birthYear: participant.getElementsByTagName('year')[0].textContent,
  sex: participant.getElementsByTagName('sex')[0].textContent === '2' ? 'weiblich' : 'männlich',
  birthplace: participant.getElementsByTagName('birthplace')[0].textContent,
  nationality: participant.getElementsByTagName('nationality')[0].textContent,
  secondNationality: participant.getElementsByTagName('secondnationality')[0]?.textContent || '',
  currentResidence: participant.getElementsByTagName('habitation')[0].textContent,
  postalCode: participant.getElementsByTagName('zip')[0].textContent,
  street: participant.getElementsByTagName('street')[0].textContent,
  houseNumber: participant.getElementsByTagName('no')[0].textContent,
  studyCentre: participant.getElementsByTagName('studycentre')[0].textContent,
  requestId: participant.getElementsByTagName('idv')[0].textContent
}));

  return parsedData;
};

const TableContent = ({ data }) => { 
  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'ID', size: 50 },
      { accessorKey: 'familyName', header: 'Familienname', size: 150 },
      { accessorKey: 'firstName', header: 'Rufname', size: 150 },
      { accessorKey: 'birthDay', header: 'Geburtstag', size: 100 },
      { accessorKey: 'birthMonth', header: 'Geburtsmonat', size: 100 },
      { accessorKey: 'birthYear', header: 'Geburtsjahr', size: 100 },
      { accessorKey: 'sex', header: 'Geschlecht', size: 100 },
      { accessorKey: 'birthplace', header: 'Geburtsort', size: 150 },
      { accessorKey: 'nationality', header: 'Staatsangehörigkeit_ISO_2', size: 150 },
      { accessorKey: 'secondNationality', header: 'Frührere_Staatsangehörigkeit_1_ISO_2', size: 150 },
      { accessorKey: 'currentResidence', header: 'Wohnort_aktuell', size: 150 },
      { accessorKey: 'postalCode', header: 'Wohnort_aktuell_PLZ', size: 100 },
      { accessorKey: 'street', header: 'Wohnort_aktuell_Straße', size: 150 },
      { accessorKey: 'houseNumber', header: 'Wohnort_aktuell_Hausnummer', size: 50 },
      { accessorKey: 'studyCentre', header: 'Studienzentrum', size: 150 },
      { accessorKey: 'requestId', header: 'Vorgang', size: 50 },
    ],
    []
  );

  return <MaterialReactTable columns={columns} data={data} initialState={{ columnVisibility: { secondNationality: false, studyCentre: false, requestId: false } }} />;
};
export default TableContent;
