import BigInteger from "bigi";
import { Point, getCurveByName } from "ecurve";
var secp256k1 = getCurveByName("secp256k1");
import { encode, decode } from "bs58";
import { sha256, sha512, ripemd160 } from "./hash";
import { ChainConfig } from "tuscjs-ws";
import assert from "assert";
import deepEqual from "deep-equal";

var Buffer = require("safe-buffer").Buffer;

var G = secp256k1.G,
    n = secp256k1.n;

var PublicKey =
/*#__PURE__*/
function () {
  /** @param {Point} public key */
  function PublicKey(Q) {
    this.Q = Q;
  }

  PublicKey.fromBinary = function fromBinary(bin) {
    return PublicKey.fromBuffer(Buffer.from(bin, "binary"));
  };

  PublicKey.fromBuffer = function fromBuffer(buffer) {
    if (buffer.toString("hex") === "000000000000000000000000000000000000000000000000000000000000000000") return new PublicKey(null);
    return new PublicKey(Point.decodeFrom(secp256k1, buffer));
  };

  var _proto = PublicKey.prototype;

  _proto.toBuffer = function toBuffer(compressed) {
    if (compressed === void 0) {
      compressed = this.Q ? this.Q.compressed : null;
    }

    if (this.Q === null) return Buffer.from("000000000000000000000000000000000000000000000000000000000000000000", "hex");
    return this.Q.getEncoded(compressed);
  };

  PublicKey.fromPoint = function fromPoint(point) {
    return new PublicKey(point);
  };

  _proto.toUncompressed = function toUncompressed() {
    var buf = this.Q.getEncoded(false);
    var point = Point.decodeFrom(secp256k1, buf);
    return PublicKey.fromPoint(point);
  }
  /** bts::blockchain::address (unique but not a full public key) */
  ;

  _proto.toBlockchainAddress = function toBlockchainAddress() {
    var pub_buf = this.toBuffer();
    var pub_sha = sha512(pub_buf);
    return ripemd160(pub_sha);
  }
  /** Alias for {@link toPublicKeyString} */
  ;

  _proto.toString = function toString(address_prefix) {
    if (address_prefix === void 0) {
      address_prefix = ChainConfig.address_prefix;
    }

    return this.toPublicKeyString(address_prefix);
  }
  /**
      Full public key
      {return} string
  */
  ;

  _proto.toPublicKeyString = function toPublicKeyString(address_prefix) {
    if (address_prefix === void 0) {
      address_prefix = ChainConfig.address_prefix;
    }

    var pub_buf = this.toBuffer();
    var checksum = ripemd160(pub_buf);
    var addy = Buffer.concat([pub_buf, checksum.slice(0, 4)]);
    return address_prefix + encode(addy);
  }
  /**
      @arg {string} public_key - like TUSCXyz...
      @arg {string} address_prefix - like TUSC
      @return PublicKey or `null` (if the public_key string is invalid)
  */
  ;

  PublicKey.fromPublicKeyString = function fromPublicKeyString(public_key, address_prefix) {
    if (address_prefix === void 0) {
      address_prefix = ChainConfig.address_prefix;
    }

    try {
      return PublicKey.fromStringOrThrow(public_key, address_prefix);
    } catch (e) {
      return null;
    }
  }
  /**
      @arg {string} public_key - like TUSCXyz...
      @arg {string} address_prefix - like TUSC
      @throws {Error} if public key is invalid
      @return PublicKey
  */
  ;

  PublicKey.fromStringOrThrow = function fromStringOrThrow(public_key, address_prefix) {
    if (address_prefix === void 0) {
      address_prefix = ChainConfig.address_prefix;
    }

    if (public_key.Q === null) public_key = address_prefix + "1111111111111111111111111111111114T1Anm"; // null key

    var prefix = public_key.slice(0, address_prefix.length);
    assert.equal(address_prefix, prefix, "Expecting key to begin with " + address_prefix + ", instead got " + prefix);
    public_key = public_key.slice(address_prefix.length);
    public_key = Buffer.from(decode(public_key), "binary");
    var checksum = public_key.slice(-4);
    public_key = public_key.slice(0, -4);
    var new_checksum = ripemd160(public_key);
    new_checksum = new_checksum.slice(0, 4);
    var isEqual = deepEqual(checksum, new_checksum); //, 'Invalid checksum'

    if (!isEqual) {
      throw new Error("Checksum did not match");
    }

    return PublicKey.fromBuffer(public_key);
  };

  _proto.toAddressString = function toAddressString(address_prefix) {
    if (address_prefix === void 0) {
      address_prefix = ChainConfig.address_prefix;
    }

    var pub_buf = this.toBuffer();
    var pub_sha = sha512(pub_buf);
    var addy = ripemd160(pub_sha);
    var checksum = ripemd160(addy);
    addy = Buffer.concat([addy, checksum.slice(0, 4)]);
    return address_prefix + encode(addy);
  };

  _proto.toPtsAddy = function toPtsAddy() {
    var pub_buf = this.toBuffer();
    var pub_sha = sha256(pub_buf);
    var addy = ripemd160(pub_sha);
    addy = Buffer.concat([Buffer.from([0x38]), addy]); //version 56(decimal)

    var checksum = sha256(addy);
    checksum = sha256(checksum);
    addy = Buffer.concat([addy, checksum.slice(0, 4)]);
    return encode(addy);
  };

  _proto.child = function child(offset) {
    assert(Buffer.isBuffer(offset), "Buffer required: offset");
    assert.equal(offset.length, 32, "offset length");
    offset = Buffer.concat([this.toBuffer(), offset]);
    offset = sha256(offset);
    var c = BigInteger.fromBuffer(offset);
    if (c.compareTo(n) >= 0) throw new Error("Child offset went out of bounds, try again");
    var cG = G.multiply(c);
    var Qprime = this.Q.add(cG);
    if (secp256k1.isInfinity(Qprime)) throw new Error("Child offset derived to an invalid key, try again");
    return PublicKey.fromPoint(Qprime);
  }
  /* <HEX> */
  ;

  _proto.toByteBuffer = function toByteBuffer() {
    var b = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
    this.appendByteBuffer(b);
    return b.copy(0, b.offset);
  };

  PublicKey.fromHex = function fromHex(hex) {
    return PublicKey.fromBuffer(Buffer.from(hex, "hex"));
  };

  _proto.toHex = function toHex() {
    return this.toBuffer().toString("hex");
  };

  PublicKey.fromPublicKeyStringHex = function fromPublicKeyStringHex(hex) {
    return PublicKey.fromPublicKeyString(Buffer.from(hex, "hex"));
  }
  /* </HEX> */
  ;

  return PublicKey;
}();

export default PublicKey;