'use client';

export default function ArenaDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Arena Detail: {params.id}</h1>
    </div>
  );
}
