'use strict';

// var constants = require( './constants' );

/**
 * Создает JSON с данными новой Pipe.
 * @method generate
 * @param  {IPipeData} lastPipe     Предыдущая Pipe.
 * @param  {object}    state
 * @param  {number}    state.offset Отступ новой Pipe от старой.
 * @return {IPipeData}              Данные новой Pipe.
 * @example
 * var generate = require( './shared/generate_Pipe' );
 * var newPipe = generate( lastPipe );
 */
function generate ( lastPipe, state )
{
  return {
    x: lastPipe.x + state.offset,
    y: lastPipe.y + 100,
    h: lastPipe.h
  };
}

module.exports = generate;
