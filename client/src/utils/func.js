/**
 * 
 * NOTE: 'fields' is a reserved workd. avoid to use it as query field!
 */



export const analyzeToQuery = (strQuery) => {
    console.log('[analyzeToQuery]');
    // strQuery = `organization(1).fields('name').users.fields('name').organizations.fields('name').users.fields('name','email')`;
    const queryTokens = strQuery.split('.'); //console.log(queryTokens);
    if (queryTokens.length === 0) return { status: false, message: 'Empty input!' };

    const strInner = '<<INNER>>';
    const layerTemplate = `<<OBJ>> <<VAR>> {${strInner}}`;
    let queryContent = `${strInner}`;

    let processedLength = 0;
    let primaryField = "";
    try {
        while (processedLength < queryTokens.length) {
            // <<OBJ>>
            const strObj = getIndicator(queryTokens[processedLength]);
            if (processedLength === 0) {
                primaryField = strObj;
            }
            // <<VAR>> get indicator variable
            const objId = getObjectId(queryTokens[processedLength], strObj);

            // <<INNER>>
            const strFields = getIndicator(queryTokens[processedLength + 1]);
            const strVar = filterStringToVar(getObjectId(queryTokens[processedLength + 1], strFields));
            if (strFields !== 'fields') {
                return {
                    status: false,
                    message: 'Syntax Error!'
                }
            }

            const currentLayer = layerTemplate
                .replace('<<OBJ>>', strObj)
                .replace('<<VAR>>', objId ? `(id: ${objId})` : ``)
                .replace(strInner, `${strVar} ${strInner}`);
            queryContent = queryContent.replace(strInner, currentLayer);
            processedLength += 2;
        }
    } catch (e) {
        return { status: false, message: 'Error!' };
    }

    // remove the latest inner template
    queryContent = queryContent.replace(strInner, ``);
    return {
        status:  true,
        data: queryContent,
        primary: primaryField
    };
}

const getIndicator = (_src) => {
    let temp = _src.indexOf('(');
    temp = temp > 0 ? temp : _src.length;
    return _src.substring(0, temp);
}

const getObjectId = (_src, _ext) => {
    let tempId = _src.length > _ext.length ? _src.substring(_ext.length, _src.length) : null;
    if (!!tempId) {
        tempId = tempId.replace(/[{()}]/g, "");
    }
    return tempId;
}

const filterStringToVar = (_src) => {
    return _src.replace(/'/g, '').replace(/[,]/g, ' ');
}