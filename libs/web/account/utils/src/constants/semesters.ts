export interface Semester {
  value: Date;
  viewValue: string;
}

export interface Term {
  year: string;
  semesters: Semester[];
}

function createTermArray(startYear = 2007, endYear = new Date().getFullYear()): Term[] {
  const num = endYear - startYear;

  const years: Term[] = [];

  for (let i = 0; i < num + 1; i++) {
    const y = startYear + i;
    years.push({
      year: String(y),
      semesters: [
        { viewValue: `Vår ${y}`, value: new Date(y, 7, 1, 0, 0, 0, 0) },
        { viewValue: `Høst ${y}`, value: new Date(y, 0, 1, 0, 0, 0, 0) },
      ],
    });
  }

  return years.sort((a, b) => (parseInt(a.year) < parseInt(b.year) ? 1 : -1));
}

const membershipMinYear = 2007;
const immatriculationMinYear = 1990;
const graduationMinYear = 1990;

const membershipMaxYear = new Date().getFullYear();
const immatriculationMaxYear = new Date().getFullYear();
const graduationMaxYear = new Date().getFullYear() + 5;

export const membershipTerms = createTermArray(membershipMinYear, membershipMaxYear);
export const immatriculationTerms = createTermArray(immatriculationMinYear, immatriculationMaxYear);
export const graduationTerms = createTermArray(graduationMinYear, graduationMaxYear);
