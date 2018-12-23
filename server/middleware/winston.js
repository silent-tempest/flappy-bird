'use strict';

var logger   = require( '../logger' );

module.exports = function ( request, response, next )
{
  var i = request._info;
  logger.verbose( `ID: ${i.ID}, Worker: "${i.Worker}", IP: "${i.IP}", UA: "${i.UA}", Method: "${i.Method}", URL: "${i.URL}"` );
  next();
};
