export var kvPut = async (context, key, value, options = {}) => {
  try {
    // let value = await context.locals.runtime.env.KV.put('test', JSON.stringify(blogPosts));
    console.log("adding to kv", key);
    var now = new Date().getTime();
    await context.locals.runtime.env.KV.put(key, JSON.stringify(value), {
      metadata: { updatedOn: now },
    });
  } catch (error) {
    console.error(error);
  }
};

export var kvGet = async (context, key, options = { type: "json" }) => {
  try {
    return context.locals.runtime.env.KV.get(key, options);
  } catch (error) {
    console.error(error);
  }
};

export var kvGetAll = async (context) => {
  try {
    var list = await context.locals.runtime.env.KV.list();
    return list.keys;
  } catch (error) {
    console.error(error);
  }
};

export var kvDelete = async (context, key) => {
  try {
    return context.locals.runtime.env.KV.delete(key);
  } catch (error) {
    console.error(error);
  }
};

export var kvPurgeAll = async (context) => {
  try {
    var list = await context.locals.runtime.env.KV.list();
    for (var key of list.keys) {
      await context.locals.runtime.env.KV.delete(key.name);
    }
    return { status: "success" };
  } catch (error) {
    console.error(error);
  }
};
