import PDFLink from "./PDFLink";

export default function VacancyCard({
  title,
  contractType,
  closingDate,
  salary,
  documentHref,
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-[#0b2545]">{title}</h3>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-zinc-600">
        {contractType && (
          <>
            <dt className="font-medium text-zinc-500">Contract</dt>
            <dd>{contractType}</dd>
          </>
        )}
        {salary && (
          <>
            <dt className="font-medium text-zinc-500">Salary</dt>
            <dd>{salary}</dd>
          </>
        )}
        {closingDate && (
          <>
            <dt className="font-medium text-zinc-500">Closing date</dt>
            <dd>{closingDate}</dd>
          </>
        )}
      </dl>
      {documentHref && (
        <div className="mt-4">
          <PDFLink href={documentHref}>View job pack</PDFLink>
        </div>
      )}
    </div>
  );
}
