import React from 'react';

const SearchResults = ({ results }) => (
  <ul>
    {results.map((result) => (
      <li key={result.id}>{result.name}</li>
    ))}
  </ul>
);

export default SearchResults;