const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners()

  // Hardhat Runtime Environment => HRE
  // when run npx hardhat we get the hre env from the hardhat config file
  // compile contract and generate files under /artifacts. We need these files to work with the contract
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal')

  // deploy contract to blockchain
  // hardhat generate a local Eth network just for this contract. And it will delete it after the script has run
  // everytime the scrip run, is a new local network/a new blockchain to start with a fresh env and not have weird error
  const waveContract = await waveContractFactory.deploy()

  // wait for the contract to be deployed.
  //Just now the consturctor run
  await waveContract.deployed()
  hre.ethers.getSigners()

  // console.log({ waveContract })

  // address is where we can find contract on blockchain
  console.log('Contract deployed to:', waveContract.address)
  console.log('random person:', randomPerson.address)
  console.log('Contract deployed by:', owner.address)

  const totWavesGas = await waveContract.estimateGas.getTotWaves()
  const waveGas = await waveContract.estimateGas.wave()
  console.log('Estimated gas to get total of waves:', Number(totWavesGas))
  console.log('Estimated gas to wave:', Number(waveGas))

  let waveCount
  let wavers = []

  const waversArray = (waver) => {
    wavers.push(waver)
  }

  waveCount = await waveContract.getTotWaves()

  let wave = await waveContract.wave()
  // deployTransaction: wave is all info about the transaction
  // console.log('wave to await', wave)
  await wave.wait() // we need to wait bc in wave func we are modifying the state of the blockchain
  waversArray(wave.from)
  waveCount = await waveContract.getTotWaves() // no wait bc the blockchain is not modify

  wave = await waveContract.connect(randomPerson).wave()
  await wave.wait()
  waversArray(wave.from)
  waveCount = await waveContract.getTotWaves()

  console.log(`List of wavers: ${wavers}`)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0) // exit Node process without error
  } catch (error) {
    console.log(error)
    process.exit(1) // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
}

runMain()
