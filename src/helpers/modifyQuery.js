import queryString from 'query-string';

export function modifyQuery(primary, langId, search){
  const query = queryString.parse(search);
  if(primary){
    const filteredLangs = query.primaryLanguages.split(',').filter(id => id !== langId);
    query.primaryLanguages = filteredLangs ? filteredLangs.join(',') : null;
    if (query.primaryLanguages.length === 0) {delete query.primaryLanguages};
  } else {
    const filteredLangs = query.languages.split(',').filter(id => id !== langId);
    query.languages = filteredLangs.join(',');
    if (query.languages.length === 0) {delete query.languages};
  }
  return queryString.stringify(query);
}
