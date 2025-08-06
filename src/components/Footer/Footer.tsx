import { Link } from 'react-router-dom'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import BookIcon from '@mui/icons-material/Book'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import PaidIcon from '@mui/icons-material/Paid'
import SecurityIcon from '@mui/icons-material/Security'

function Footer() {
  return (
    <footer className='border-t-2 border-orange bg-white py-16'>
      <div className='container'>
        <div className='flex justify-around'>
          {/* DỊCH VỤ KHÁCH HÀNG */}
          <div>
            <p className='mb-7 text-sm font-bold'>DỊCH VỤ KHÁCH HÀNG</p>
            <Link to=''>
              <div className='my-2 flex'>
                <div className='mr-2'>
                  <SupportAgentIcon />
                </div>
                <p>Trung Tâm Trợ Giúp Shopee</p>
              </div>
            </Link>
            <Link to=''>
              <div className='my-2 flex'>
                <div className='mr-2'>
                  <BookIcon />
                </div>
                <p>Shopee Blog</p>
              </div>
            </Link>
            <Link to=''>
              <div className='my-2 flex'>
                <div className='mr-2'>
                  <LocationCityIcon />
                </div>
                <p>Shopee Mall</p>
              </div>
            </Link>
            <Link to=''>
              <div className='my-2 flex'>
                <div className='mr-2'>
                  <ShoppingBasketIcon />
                </div>
                <p>Hướng Dẫn Mua Hàng/Đặt Hàng</p>
              </div>
            </Link>
            <Link to=''>
              <div className='my-2 flex'>
                <div className='mr-2'>
                  <PaidIcon />
                </div>
                <p>Shopee Xu</p>
              </div>
            </Link>
            <Link to=''>
              <div className='my-2 flex'>
                <div className='mr-2'>
                  <SecurityIcon />
                </div>
                <p>Chính Sách Bảo Hành</p>
              </div>
            </Link>
          </div>
          {/* THEO DÕI SHOPEE */}
          <div>
            <p className='mb-7 text-sm font-bold'>THEO DÕI SHOPEE</p>
            <Link to=''>
              <div className='my-2 flex'>
                <div className='mr-2'>
                  <img src='https://down-vn.img.susercontent.com/file/2277b37437aa470fd1c71127c6ff8eb5' alt='' />
                </div>
                <p>Facebook</p>
              </div>
            </Link>
            <Link to=''>
              <div className='my-2 flex'>
                <div className='mr-2'>
                  <img src='https://down-vn.img.susercontent.com/file/5973ebbc642ceee80a504a81203bfb91' alt='' />
                </div>
                <p>Instagram</p>
              </div>
            </Link>
            <Link to=''>
              <div className='my-2 flex'>
                <div className='mr-2'>
                  <img src='https://down-vn.img.susercontent.com/file/f4f86f1119712b553992a75493065d9a' alt='' />
                </div>
                <p>LinkedIn</p>
              </div>
            </Link>
          </div>
          {/* THANH TOÁN | ĐƠN VỊ VẬN CHUYỂN*/}
          <div>
            <div>
              <p className='mb-7 text-sm font-bold'>THANH TOÁN</p>
              <div>
                <div className='mb-2'>
                  <div className='mr-2 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md'>
                    <img
                      className='h-5'
                      src='https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8'
                      alt=''
                    />
                  </div>
                  <div className='mr-2 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md'>
                    <img
                      className='h-5'
                      src='https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16'
                      alt=''
                    />
                  </div>
                  <div className='mr-2 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md'>
                    <img
                      className='h-5'
                      src='https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08'
                      alt=''
                    />
                  </div>
                </div>
                <div className='mb-2'>
                  <div className='mr-2 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md'>
                    <img
                      className='h-5'
                      src='https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c'
                      alt=''
                    />
                  </div>
                  <div className='mr-2 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md'>
                    <img
                      className='h-5'
                      src='https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281'
                      alt=''
                    />
                  </div>
                  <div className='mr-2 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md'>
                    <img
                      className='h-5'
                      src='https://down-vn.img.susercontent.com/file/5e3f0bee86058637ff23cfdf2e14ca09'
                      alt=''
                    />
                  </div>
                </div>
                <div className='mb-2'>
                  <div className='mr-2 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md'>
                    <img
                      className='h-5'
                      src='https://down-vn.img.susercontent.com/file/9263fa8c83628f5deff55e2a90758b06'
                      alt=''
                    />
                  </div>
                  <div className='mr-2 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md'>
                    <img
                      className='h-5'
                      src='https://down-vn.img.susercontent.com/file/0217f1d345587aa0a300e69e2195c492'
                      alt=''
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className='my-7 text-sm font-bold'>ĐƠN VỊ VẬN CHUYỂN</p>
              <div>
                <div className='mb-2'>
                  <div className='mr-2 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md'>
                    <img
                      className='h-5'
                      src='https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m20rc1wk8926cf'
                      alt=''
                    />
                  </div>
                  <div className='mr-2 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md'>
                    <img
                      className='h-5'
                      src='https://down-vn.img.susercontent.com/file/vn-50009109-64f0b242486a67a3d29fd4bcf024a8c6'
                      alt=''
                    />
                  </div>
                  <div className='mr-2 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md'>
                    <img
                      className='h-5'
                      src='https://down-vn.img.susercontent.com/file/59270fb2f3fbb7cbc92fca3877edde3f'
                      alt=''
                    />
                  </div>
                </div>
                <div className='mb-2'>
                  <div className='mr-2 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md'>
                    <img
                      className='h-5'
                      src='https://down-vn.img.susercontent.com/file/957f4eec32b963115f952835c779cd2c'
                      alt=''
                    />
                  </div>
                  <div className='mr-2 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md'>
                    <img
                      className='h-5'
                      src='https://down-vn.img.susercontent.com/file/0d349e22ca8d4337d11c9b134cf9fe63'
                      alt=''
                    />
                  </div>
                  <div className='mr-2 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md'>
                    <img
                      className='h-5'
                      src='https://down-vn.img.susercontent.com/file/3900aefbf52b1c180ba66e5ec91190e5'
                      alt=''
                    />
                  </div>
                </div>
                <div className='mb-2'>
                  <div className='mr-2 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md'>
                    <img
                      className='h-5'
                      src='https://down-vn.img.susercontent.com/file/6e3be504f08f88a15a28a9a447d94d3d'
                      alt=''
                    />
                  </div>
                  <div className='mr-2 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md'>
                    <img
                      className='h-5'
                      src='https://down-vn.img.susercontent.com/file/0b3014da32de48c03340a4e4154328f6'
                      alt=''
                    />
                  </div>
                  <div className='mr-2 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md'>
                    <img
                      className='h-5'
                      src='https://down-vn.img.susercontent.com/file/vn-50009109-ec3ae587db6309b791b78eb8af6793fd'
                      alt=''
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* TẢI ỨNG DỤNG SHOPEE */}
          <div>
            <p className='mb-7 text-sm font-bold'>TẢI ỨNG DỤNG SHOPEE</p>
            <div className='inline-flex'>
              <div className='mx-2'>
                <img src='https://down-vn.img.susercontent.com/file/a5e589e8e118e937dc660f224b9a1472' alt='' />
              </div>
              <div className='flex flex-col'>
                <div className='mb-2 inline-flex items-center justify-center border border-gray-300 bg-white px-2 py-2 shadow-md'>
                  <img src='https://down-vn.img.susercontent.com/file/ad01628e90ddf248076685f73497c163' alt='' />
                </div>
                <div className='mb-2 inline-flex items-center justify-center border border-gray-300 bg-white px-2 py-2 shadow-md'>
                  <img src='https://down-vn.img.susercontent.com/file/ae7dced05f7243d0f3171f786e123def' alt='' />
                </div>
                <div className='mb-2 inline-flex items-center justify-center border border-gray-300 bg-white px-2 py-2 shadow-md'>
                  <img src='https://down-vn.img.susercontent.com/file/35352374f39bdd03b25e7b83542b2cb0' alt='' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-10 w-full bg-neutral-100 px-5 py-6 text-center text-sm'>
        <div className='my-5 justify-items-center align-middle'>
          <img
            className='block w-5/12'
            src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9765d68a8945750d.png'
            alt=''
          />
        </div>
        <div className='py-7'>Công ty TNHH Shopee</div>
        <div className='mt-2'>
          Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành phố
          Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
        </div>
        <div className='mt-2'>Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Bùi Anh Tuấn</div>
        <div className='mt-2'>
          Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
        </div>
        <div className='mt-2'>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</div>
      </div>
    </footer>
  )
}

export default Footer
