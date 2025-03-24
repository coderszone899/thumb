import { deleteD1ByTableAndId } from "@services/d1-data";
import { kvDelete, kvGetAll } from "@services/kv";
import { getAdminKvData } from "@services/kv-data";
import { return200 } from "@services/return-types";
import qs from "qs";

export let GET = async (context) => {
  let data = await getAdminKvData(context);

  return return200(data);
};

export let DELETE = async (context) => {
  let queryParams = qs.parse(context.request.url.split("?")[1]);

  let id = queryParams.id;
  let url = queryParams.url;

  //delete d1 records
  await deleteD1ByTableAndId(
    context.locals.runtime.env.D1,
    "cacheRequests",
    id
  );
  //delete kv records
  await kvDelete(context, url);

  return return200({ status: "success" });
};
