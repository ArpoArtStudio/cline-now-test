// Pinata integration for NFT storage
export interface PinataUploadResponse {
  IpfsHash: string
  PinSize: number
  Timestamp: string
  isDuplicate?: boolean
}

export async function uploadToPinata(file: File): Promise<PinataUploadResponse> {
  const formData = new FormData()
  formData.append("file", file)

  const pinataMetadata = JSON.stringify({
    name: file.name,
    keyvalues: {
      uploadedBy: "ArpoStudio",
      timestamp: new Date().toISOString(),
    },
  })
  formData.append("pinataMetadata", pinataMetadata)

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  })
  formData.append("pinataOptions", pinataOptions)

  const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("Pinata upload error:", errorText)
    throw new Error(`Failed to upload to Pinata: ${response.status}`)
  }

  return response.json()
}

export async function uploadMetadataToPinata(metadata: any): Promise<PinataUploadResponse> {
  const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
    },
    body: JSON.stringify({
      pinataContent: metadata,
      pinataMetadata: {
        name: `${metadata.name}-metadata`,
        keyvalues: {
          type: "metadata",
          uploadedBy: "ArpoStudio",
        },
      },
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("Pinata metadata upload error:", errorText)
    throw new Error(`Failed to upload metadata to Pinata: ${response.status}`)
  }

  return response.json()
}

// Helper function to get IPFS URL
export function getIPFSUrl(hash: string): string {
  return `https://gateway.pinata.cloud/ipfs/${hash}`
}

// Test Pinata connection
export async function testPinataConnection(): Promise<boolean> {
  try {
    const response = await fetch("https://api.pinata.cloud/data/testAuthentication", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
    })

    return response.ok
  } catch (error) {
    console.error("Pinata connection test failed:", error)
    return false
  }
}
