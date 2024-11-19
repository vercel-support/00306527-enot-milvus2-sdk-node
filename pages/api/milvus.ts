import type { NextApiRequest, NextApiResponse } from 'next'
import { MilvusClient, DataType } from '@zilliz/milvus2-sdk-node'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const address = process.env.ADDRESS || ""
  const username = process.env.USERNAME || ""
  const password = process.env.PASSWORD || ""

  // 1. Connect to the cluster
  try {
    const client = new MilvusClient({
      address,
      ssl: true,
      username,
      password,
    })

    // 3. Create a collection in customized setup mode
    // 3.1 Define fields
    const fields = [
      {
        name: "my_id",
        data_type: DataType.Int64,
        is_primary_key: true,
        auto_id: false
      },
      {
        name: "my_vector",
        data_type: DataType.FloatVector,
        dim: 5
      },
    ]

    // 3.2 Prepare index parameters
    const index_params = [{
      field_name: "my_vector",
      index_type: "AUTOINDEX",
      metric_type: "IP"
    }]

    // 3.3 Create a collection with fields and index parameters

    const response = await client.createCollection({
      collection_name: "vercel_support",
      fields: fields,
      index_params: index_params,
    })
    res.status(200).json({ msg: "success" })

  } catch (error) {
    console.log(error)
    res.status(200).json({ "Error": error })
  }
}