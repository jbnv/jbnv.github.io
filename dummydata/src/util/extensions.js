String.prototype.toTitleCase = function()
{
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

String.prototype.toInitialCase = function()
{
    return this.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}

Array.prototype.randomElement = function() {
  return this[Math.floor(this.length*Math.random())];
}
