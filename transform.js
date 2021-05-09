const {Transform} = require('stream');
const { encode } = require('./caesar');

class Transformer extends Transform
{
   constructor(opt = {})
   {   
       super(opt);
       this.shift = opt.shift;
   }
   /**
    * метод, реализующий в себе запись данных (chunk поступают в поток Transform), 
    * и чтение данных - когда другой поток читает из Transform
    * @param chunk
    * @param encoding
    * @param done - в общем случае done(err, chunk)
    * @private
    */
   _transform(chunk, encoding = 'utf8', done)
  {
      const newChunk = encode(chunk.toString(), this.shift);
      this.push(newChunk);
      done();
   }
}

module.exports.Transformer = Transformer 