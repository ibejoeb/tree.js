var preorder = function(n, visit) {
    if (!n) return;
    var die = visit(n);
    if (die) return; // short circuit
    for (var i = 0; i < n.children.length; i++) {
        preorder(n.children[i], visit);
    }
}

var Node = function(data) {
    var self = this;
    self.parent = null;
    self.children = [];
    self.data = data;
}

Node.prototype = {

    descend: function(f) {
        preorder(this, f);
    },

    siblings: function() {
        if (!this.parent) return [];
        return this.parent.children;
    },

    hasSiblings: function() {
        if (!this.parent) return false;
        return (this.parent.children.length > 1);
    },

    siblingIndex: function() {
        if (!this.parent) return undefined;
        var siblings = this.parent.children;
        for (var i = 0; i < siblings.length; i++) {
            var x = siblings[i];
            if (x === this) return i;
        }
    },

    adjacent: function() {
        if (!this.parent) return [null, null];
        var siblings = this.parent.children;
        var p = null;
        var n = null;
        for (var i = 0; i < siblings.length && !n; i++) {
            var x = siblings[i];
            if (x === this) {
                if (i > 0) p = siblings[i - 1];
                if (i < siblings.length - 1) n = siblings[i + 1];
                break;
            }
        }
        return [p, n];
    },

    previousSibling: function() {
        return this.adjacent()[0];
    },

    nextSibling: function() {
        return this.adjacent()[1];
    },

    isLeaf: function() {
        return (this.children.length == 0);
    },
}

ns.Tree = function(root) {
    var self = this;
    self.root = root;

    self.all = function() {
        var o = self.root;
        var items = [];

        preorder(root, function(n) {
            items.push(n);
        });

        return items;
    }

    self.findById = function(id) {
        var o = null;
        preorder(root, function(n) {
            if (n.data.id == id) {
                o = n;
                return true;
            }
        });
        return o;
    }
}

